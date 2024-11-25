export type ReportType = {
  // нзвание подразделения
  department?: string
  // фио помошника начальника участка
  master?: string
  // дата заполнения отчёта
  report_date?: string
  // номер рабочей смены
  work_shift?: string
  // буровой станок
  drilling_rig?: string
  // буровая бригада
  team?: string
  // вид работ по наряду
  work_order?: string
  // TODO: может быть number?
  // номер скважины
  well_number?: string
  // бурение пилотно ствола
  pilot_well?: string
  // расширение скважины
  well_expansion?: string
  // спуск ОК
  down_ok?: string
  // цементаж ОК
  cementing_ok?: string //литры
  // ОЗЦ
  ozc?: string
  // Сборка КНБК
  assembly_knbk?: boolean
  // долото
  doloto: string
  // ВЗД
  vzd: string
  // телеметрия
  telemetry: string
  // блок батареи
  bb: string
  // ЕО станка
  rig_maintenance: string
  // бурение с взд
  drill_with_vzd: number
}
