import String from 'App/Helpers/String'
import collect from 'collect.js'
import { UserContract } from '../Contracts/UserContract'
import User from '../Models/TesteLogin'

export default class UserService {
  constructor(protected trx: any) {}

  protected NO_CHANGE_PASSWORD = 'no_change_password'

  /**
   * Store
   * @param user
   */
  public async store(user: UserContract): Promise<User> {
    user = <UserContract>String.toLowerCaseObj(user, ['password'])
    const model = new User()
    model.email = user.email
    model.password = user.password!
    model.active = user.active === false || user.active === null ? false : true
    model.pathProfile = user.pathProfile
    model.typeUser = user.typeUser
    model.dbClientId = user.dbClientId
    return await model.useTransaction(this.trx).save()
  }

  /**
   * Update
   * @param id
   * @param user
   * @returns
   */
  public async update(id: number, user: UserContract): Promise<User> {
    user = <UserContract>String.toLowerCaseObj(user, ['password'])
    const model = <User>await User.query().where({ id, dbClientId: user.dbClientId }).first()

    if (user.password !== this.NO_CHANGE_PASSWORD) {
      model.password = user.password
    }

    model.email = user.email
    model.active = user.active === false || user.active === null ? false : true
    model.pathProfile = user.pathProfile
    model.typeUser = user.typeUser
    model.dbClientId = user.dbClientId
    return await model.useTransaction(this.trx).save()
  }

  /**
   * Users for select
   * @param active
   * @param dbClientId
   * @returns
   */
  public static async usersForSelect(active, dbClientId) {
    active = active ?? true

    const dataSelect: Array<{ id: number; name: string; fullName: string }> = []

    let query = User.query()

    if (active) {
      query.where({ active })
    }

    const users = await query.where({ dbClientId }).preload('profile')

    for (const user of users) {
      dataSelect.push({
        id: user.id,
        name: user.profile.name,
        fullName: `${user.profile.name} ${user.profile.lastName}`,
      })
    }

    return collect(dataSelect).sortBy('name').all()
  }

  /**
   * Get total users
   * @param dbClientId
   * @returns
   */
  public static async getTotalUsers(dbClientId: number) {
    const total = await User.query().where({ db_client_id: dbClientId }).pojo<{ count: number }>().count('*')
    return total[0]['count(*)']
  }
}
