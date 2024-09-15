import { create } from 'zustand'

interface Count {
  id: number
  value: number
}

interface CountState {
  counts: Count[]
  loading: boolean
  error: string | null
  // fetchCounts: () => Promise<void>
  // addNewCount: (value: number) => Promise<void>
}

// Создаем Zustand store
export const useCountStore = create<CountState>(() => ({
  counts: [],
  loading: false,
  error: null,

  // // Асинхронная функция для получения данных из LowDB
  // fetchCounts: async () => {
  //   set({ loading: true, error: null })
  //   try {
  //     const counts = await getCounts() // Получаем данные из LowDB
  //     set({ counts, loading: false })
  //   } catch (err) {
  //     set({ error: 'Failed to fetch counts', loading: false })
  //   }
  // },

  // // Асинхронная функция для добавления нового элемента в LowDB
  // addNewCount: async (value: number) => {
  //   set({ loading: true, error: null })
  //   try {
  //     await addCount(value) // Добавляем новый элемент в LowDB
  //     const counts = await getCounts() // Обновляем данные в Zustand
  //     set({ counts, loading: false })
  //   } catch (err) {
  //     set({ error: 'Failed to add count', loading: false })
  //   }
  // }
}))
