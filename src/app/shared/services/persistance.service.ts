import { Injectable } from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    }
    catch (e) {
      console.error('Error saving to localstorage', e)
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key))
    }
    catch (e) {
      console.error('Error getting data from localstorage', e)
      return null
    }
  }
}
