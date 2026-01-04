import json
import re
import json_repair
import logging
from ..utils.llm import create_chat_completion
from ..prompts import PromptFamily

logger = logging.getLogger(__name__)

async def choose_agent(
    query,
    cfg,
    parent_query=None,
    cost_callback: callable = None,
    headers=None,
    prompt_family: type[PromptFamily] | PromptFamily = PromptFamily,
    **kwargs
):
    """
    Chooses the agent automatically
    Args:
        parent_query: In some cases the research is conducted on a subtopic from the main query.
            The parent query allows the agent to know the main context for better reasoning.
        query: original query
        cfg: Config
        cost_callback: callback for calculating llm costs
        prompt_family: Family of prompts

    Returns:
        agent: Agent name
        agent_role_prompt: Agent role prompt
    """
    query = f"{parent_query} - {query}" if parent_query else f"{query}"
    response = None  # Initialize response to ensure it's defined

    try:
        response = await create_chat_completion(
            model=cfg.smart_llm_model,
            messages=[
                {"role": "system", "content": f"{prompt_family.auto_agent_instructions()}"},
                {"role": "user", "content": f"task: {query}"},
            ],
            temperature=0.15,
            llm_provider=cfg.smart_llm_provider,
            llm_kwargs=cfg.llm_kwargs,
            cost_callback=cost_callback,
            **kwargs
        )

        agent_dict = json.loads(response)
        # Safely extract with defaults
        server = agent_dict.get("server", "Research Agent")
        role_prompt = agent_dict.get("agent_role_prompt", 
            "You are an AI research assistant. Your purpose is to write well-written, objective, and structured reports.")
        return server, role_prompt

    except Exception as e:
        return await handle_json_error(response)


async def handle_json_error(response):
    if not response:
        logger.warning("No response received from LLM, using default agent")
        return "Research Agent", (
            "You are an AI research assistant. Your purpose is to write well-written, objective, and structured reports."
        )
    
    try:
        agent_dict = json_repair.loads(response)
        server = agent_dict.get("server", "Research Agent")
        role_prompt = agent_dict.get("agent_role_prompt",
            "You are an AI research assistant. Your purpose is to write well-written, objective, and structured reports.")
        if server and role_prompt:
            return server, role_prompt
    except Exception as e:
        error_type = type(e).__name__
        error_msg = str(e)
        logger.warning(
            f"Failed to parse agent JSON with json_repair: {error_type}: {error_msg}",
            exc_info=True
        )
        if response:
            logger.debug(f"LLM response that failed to parse: {response[:500]}...")

    json_string = extract_json_with_regex(response)
    if json_string:
        try:
            json_data = json.loads(json_string)
            server = json_data.get("server", "Research Agent")
            role_prompt = json_data.get("agent_role_prompt",
                "You are an AI research assistant. Your purpose is to write well-written, objective, and structured reports.")
            return server, role_prompt
        except (json.JSONDecodeError, KeyError) as e:
            logger.warning(
                f"Failed to decode JSON from regex extraction: {str(e)}",
                exc_info=True
            )

    logger.info("No valid JSON found in LLM response. Falling back to default agent.")
    # Return a safe default that won't cause KeyError
    default_role = (
        "You are an AI critical thinker research assistant. Your sole purpose is to write well written, "
        "critically acclaimed, objective and structured reports on given text."
    )
    return "Research Agent", default_role


def extract_json_with_regex(response):
    json_match = re.search(r"{.*?}", response, re.DOTALL)
    if json_match:
        return json_match.group(0)
    return None
