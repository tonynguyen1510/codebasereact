/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-01-10 23:15:32
 *-------------------------------------------------------*/

import Router from 'next/router';
import { SINGLE_API } from 'src/redux/actions/type';

export const getClassInfo = (id, next) => {
	return {
		type: SINGLE_API,
		payload: {
      uri: 'classes/' + id,
			successType: 'GET_CLASS_SUCCESS',
			afterSuccess: next
		},
	};
}

export const upsertClass = (data, id) => {
	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
        uri: 'classes',
        params: data,
        opt: { method: 'POST' },
				successType: 'UPSERT_CLASS_SUCCESS',
				afterSuccess: Router.push('/class')
			}
		}
	}
	return {
		type: SINGLE_API,
		payload: {
      uri: 'classes/' + id,
      params: data,
      opt: { method: 'PUT' },
			successType: 'UPSERT_CLASS_SUCCESS',
			afterSuccess: Router.push('/class')
		},
	};
}

export const deleteClass = (data, id) => {
  return {
		type: SINGLE_API,
		payload: {
      uri: 'classes/' + id,
      params: { ...data, isDelete: true },
      opt: { method: 'PUT' },
			successType: 'DELETE_CLASS_SUCCESS'
		},
	}
}

export const onValueChange = (key, value) => {
  return {
    type: 'CLASS_VALUE_CHANGE',
    payload: {
      key,
      value
    }
  }
}

export const getClasses = (next, filter) => {
  let curFilter = filter || {}
  curFilter = {
    ...filter,
      where: {
        "isDelete": {
          "neq": true
        }
      }
  }
	return {
		type: SINGLE_API,
		payload: {
      uri: `classes?filter=${JSON.stringify(curFilter)}`,
			successType: 'GET_CLASSES_SUCCESS',
			afterSuccess: next
		},
	};
}

export const resetStateClassInfo = () => {
  return {
    type: 'CLASS_RESET_STATE_INFO'
  }
}
