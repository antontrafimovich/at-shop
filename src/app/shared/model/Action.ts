export enum ActionType {
    Update,
    Delete,
    Add
}

export type Action<T> = {
    type: ActionType;
    payload: T;
};
