//export type RouteViews = 'all' | 'completed' | 'active';
export const enum FilterType { All, Completed, Active };

import { ISharedState } from './store'

export interface AppState {
    newTodoTitle: string;
    //currentView?: RouteViews;
    filterType: FilterType;
    sharedState: ISharedState;
}