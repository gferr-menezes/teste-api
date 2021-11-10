import String from 'App/Helpers/String'
import Profile from 'App/Modules/Profile/Models/Profile'
import { ProfileContract } from '../Contracts/UserContract'

export default class ProfileService {
  constructor(protected trx: any) {}

  /**
   * Store
   * @param user
   */
  public async store(profile: ProfileContract): Promise<Profile> {
    profile = <ProfileContract>String.toLowerCaseObj(profile)
    const model = new Profile()
    model.name = profile.name
    model.lastName = profile.lastName
    model.userId = profile.userId
    return await model.useTransaction(this.trx).save()
  }

  /**
   * Update
   * @param profile
   * @param id
   * @returns
   */
  public async update(userId: number, profile: ProfileContract): Promise<Profile> {
    profile = <ProfileContract>String.toLowerCaseObj(profile)
    const model = <Profile>await Profile.query().where({ userId }).first()
    model.name = profile.name
    model.lastName = profile.lastName
    model.userId = profile.userId
    return await model.useTransaction(this.trx).save()
  }
}
