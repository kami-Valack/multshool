import { User } from '../entities/User';

export interface IUserEventService {
  /**
   * Emite evento de usuário verificado para replicação em outros serviços
   * @param user Usuário que foi verificado
   */
  emitUserVerifiedEvent(user: User): Promise<void>;
}


