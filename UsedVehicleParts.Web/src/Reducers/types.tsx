export interface ActionsWithPayload<TypeAction, TypePayload> {
  type: TypeAction;
  payload: TypePayload;
}

export interface ActionsWithoutPayload<TypeAction> {
  type: TypeAction;
}

export function createActionPayload<TypeAction, TypePayload>(
  actionType: TypeAction
): (payloadType: TypePayload) => ActionsWithPayload<TypeAction, TypePayload> {
  return (
    payloadType: TypePayload
  ): ActionsWithPayload<TypeAction, TypePayload> => ({
    type: actionType,
    payload: payloadType
  });
}

export function createAction<TypeAction>(
  actionType: TypeAction
): () => ActionsWithoutPayload<TypeAction> {
  return (): ActionsWithoutPayload<TypeAction> => {
    return {
      type: actionType
    };
  };
}

interface ActionCreatorsMapObject {
  [key: string]: (
    ...args: any[]
  ) => ActionsWithPayload<any, any> | ActionsWithoutPayload<any>;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
