import * as service from './service';
import ToolClass from './utils.ts';
import Storages from 'js-storage';
const transformFn = new ToolClass();
const storage = Storages.localStorage;

export default {
  namespace: 'metting',
  state: {
    listA: storage.get('listA') || [],
    listB: storage.get('listB') || []
  },
  reducers: {
    save(state, { payload: newState }) {
      return { ...state, ...newState };
    },
  },
  effects: {
    *fetch(
      { payload: { _ } },
      { call, put },
    ) {
      // todo 优化
      const { data: { list: listA } } = JSON.parse(transformFn.decrypt(yield call(service.getMettingListA, {})))
      const { data: { list: listB } } = JSON.parse(transformFn.decrypt(yield call(service.getMettingListB, {})))
      yield storage.set('listA', listA)
      yield storage.set('listB', listB)
      yield put({
        type: 'save',
        payload: {
          listA,
          listB,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (!(storage.get('listA') && storage.get('listB'))) {
          dispatch({
            type: 'fetch',
            payload: {},
          });
        }
      });
    },
  },
};
