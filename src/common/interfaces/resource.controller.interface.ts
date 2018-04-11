export interface ResourceControllerInterface {
    index(): Promise<object>;

    create(Dto): Promise<object>;

    show(params): Promise<object>;

    update(params, Dto): Promise<void>;

    destroy(params): Promise<object>;
}