export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

export const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const FIRST_NAME_REGEX =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const LAST_NAME_REGEX =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const DATE_OF_BIRTH_REGEX =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const BASE_URL = " https://262d-197-234-221-231.ngrok-free.app";

export const REGISTER_URL = '/register';

export const LOGIN_URL = '/login';

export const REFRESH_URL = '/refresh-token';

export const CHIEF_URL = '/chief';

export const RECIPE_URL = '/recipe';

export const RECIPE_CHIEF_URL = '/chiefrecipe';

export const LIKE_RECIPE_URL = '/like/';

export const FAVOURITE_RECIPE_URL = '/favourite/';

export const HAS_LIKE_RECIPE_URL = '/hasLiked/';

export const HAS_CREATED_RECIPE_URL = '/hasCreated/';

export const HAS_FAVOURITE_RECIPE_URL = '/hasFavourite/';

export const MY_FAVOURITES_RECIPE_URL = '/favourites';

export const RESET_MDP_URL = '/modifier-password';

export const NEW_MDP_URL = '/nouveau-password';

export const VERIFY_URL = '/verify-recipe/';

export const LOGOUT_URL = '/deconnexion';


export const ROLE_USER = "USER";

export const ROLE_ADMIN = "ADMIN";


