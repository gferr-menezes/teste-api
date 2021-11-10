import { LucidRow } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export const softDelete = async (row: LucidRow) => {
  row['deletedAt'] = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
  await row.save()
}

export const softDeleteQuery = (query) => {
  query.whereNull('deletedAt')
}
