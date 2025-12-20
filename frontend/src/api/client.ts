import { OpenAPI } from './generated';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

OpenAPI.BASE = API_BASE_URL;
OpenAPI.WITH_CREDENTIALS = false;
OpenAPI.CREDENTIALS = 'include';


export { OpenAPI };
