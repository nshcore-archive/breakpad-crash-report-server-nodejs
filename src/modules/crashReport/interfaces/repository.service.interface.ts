import { AbstractEntityInterface } from './abstract.entity.interface';

export interface RepositoryServiceInterface {
    findAll(): Promise<AbstractEntityInterface[]>;

    save(payload: AbstractEntityInterface): Promise<AbstractEntityInterface>;

    findOneById(id: number): Promise<AbstractEntityInterface>;

    updateById(payload: AbstractEntityInterface, id: number): Promise<void>;

    deleteById(id: number): Promise<void>;
}