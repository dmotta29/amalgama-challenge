// Para la solucion del ejercicio 2, utilice la libreria zustand ya que su sintaxis es bastante simple (es la misma que los hooks de react)
// y la app no necesita estar envuelta en providers

import { create } from 'zustand'
import { books, users } from './api-mock'

export const useLocalStore = create(() => ({
users: users,
books: books
}))