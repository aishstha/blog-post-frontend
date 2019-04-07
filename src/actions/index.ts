import actionTypes from "../constants";

/* 
Actions are objects with information of what happened and what needs to change
Action creators are actions wrapped in a function
*/

const levelUp = (level: number) => ({
    type: actionTypes.LEVEL_UP,
    payload: level
});

const powerUp = (name: string, level: number) => ({
    type: actionTypes.POWER_UP,
    payload: {name, level}
});

// type property defines  how the state should change , nothing more than a string
// reducer will add payload to current state

const addArticle = (payload: any) => ({
  type: "ADD_ARTICLE",
  payload
});

export const Actions = {
  levelUp,
  powerUp,
  addArticle
};
