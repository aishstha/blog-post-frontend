// Auth routes
export const LOGIN = "/login";
export const INIT_LOADER = "/InitLoader";
export const LOGIN_PROGRESS = "/login/token";

// Dashboard routes
export const DASHBOARD = "/";
export const USERS = "/users";
export const POSTS = "/posts";
export const PROFILE = "/profile";

export const PROJECTS = "/projects";
export const SAMPLE = "/sample";

// User routes
export const USER_INFO = "/users/:id";
export const USER_LIST = "/users/list";
export const USER_CREATE = "/users/new";
export const USER_ACTIVE = "/users/list";
export const USER_NON_ACTIVE = "/users/list/non-active";

// Project routes
export const PROJECT_LIST = "/projects/list";
export const PROJECT_CREATE = "/projects/new";
export const PROJECT_DETAIL = "/projects/:id";
export const PROJECT_ACTIVE = "/projects/list";
export const PROJECT_EMPTY = "/projects/empty";
export const PROJECT_ARCHIVED = "/projects/list/archived";

// Project detail routes
export const PROJECT_INFO = "/projects/:id/info";
export const PROJECT_FILES = "/projects/:id/files";
export const PROJECT_USERS = "/projects/:id/users";
export const PROJECT_REPORTS = "/projects/:id/reports";
export const PROJECT_ANALYSIS = "/projects/:id/analysis";
export const PROJECT_USERS_ACTIVE = "/projects/:id/users/active";
export const PROJECT_USERS_INACTIVE = "/projects/:id/users/inactive";

// Project analysis routes
export const UPLIFT_ANALYSIS = "/projects/:id/analysis/uplift-analysis";
export const ANALYSIS_STATIC = "/projects/:id/analysis/static-analysis";
export const ANALYSIS_LIQUEFACTION = "/projects/:id/analysis/liquefaction";
export const ANALYSIS_GLOBAL_INPUTS =
  "/projects/:id/analysis/geo-technical-info/global-inputs";
export const ANALYSIS_GEO_TECHNICAL_INFO =
  "/projects/:id/analysis/geo-technical-info";

// SPT routes
export const ANALYSIS_SPT = "/projects/:id/analysis/geo-technical-info/spt";
export const ANALYSIS_CPT =
  "/projects/:id/analysis/geo-technical-info/cpt/cptview";
export const ANALYSIS_CPT_UPLOAD =
  "/projects/:id/analysis/geo-technical-info/cpt/upload";
export const ANALYSIS_SOIL_PROFILE =
  "/projects/:id/analysis/geo-technical-info/soil-profile";
export const ANALYSIS_FENCE_DIAGRAM =
  "/projects/:id/analysis/geo-technical-info/fence-diagram";
export const ANALYSIS_FENCE_DIAGRAM_FENCE =
  "/projects/:id/analysis/geo-technical-info/fence-diagram/fence";
export const ANALYSIS_FENCE_DIAGRAM_OVERLAY =
  "/projects/:id/analysis/geo-technical-info/fence-diagram/overlay";
export const ANALYSIS_CPT_UPLOAD_PROGRESS =
  "/projects/:id/analysis/geo-technical-info/cpt/uploadprogress";

// New BrowserWindow routes
export const WINDOW = "/window";
export const WINDOW_PROJECTS = "/window/projects";
export const WINDOW_PROJECT_DETAIL = "/window/projects/:id";
export const WINDOW_ANALYSIS_FENCE_DIAGRAM =
  "/window/projects/:id/analysis/geo-technical-info/fence-diagram";
export const WINDOW_DOWNLOAD_PROGRESS = "/window/download-progress";
