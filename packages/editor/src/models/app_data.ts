import { PageState } from '@/enums/page_state'

export interface AppData {
    currentPage: PageState
    currentProject?: string
}
  
export function appDataState(): AppData {
    return {
        currentProject: undefined,
        currentPage: PageState.Config,
    }
}