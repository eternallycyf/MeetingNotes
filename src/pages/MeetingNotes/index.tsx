import React, { useMemo, useRef, useState } from 'react';
import { connect } from 'umi';
import styles from './index.less';
import { Spin, Collapse } from 'antd';
import { Iprops } from './interface'
import ToolClass from './utils'
import useVirtualList from '../Hook/useVirtualList'
import { FC } from "react";
import moment from 'moment'
const { Panel } = Collapse;
const transformFn = new ToolClass();

const MeetingNotes: FC = ({
  dispatch,
  listA,
  listB,
  loading
}: Iprops) => {

  const list = useMemo(() => {
    return transformFn.sortTime([...listA, ...listB]) || []
  }, [listA, listB])

  const dayList = useMemo(() => {
    return list.map(item => ({
      ...item,
      create_time: moment(item?.['create_time']).format('YYYY-MM-DD'),
      hour: item?.['create_time']
    }))
  }, [list])

  const showDaysList = useMemo(() => {
    const timeList = [...new Set([...list.map(item => moment(item?.['create_time']).format('YYYY-MM-DD'))])]
    return timeList
  }, [list])

  const Section: FC<any> = (props: any) => {
    const ref = useRef(null)
    const entry = useVirtualList(ref, {})
    const isVisible = !!entry?.isIntersecting

    const { day } = props
    const childrenList = transformFn.findList(dayList, day)

    return (
      <div
        ref={ref}
      >
        {
          isVisible ? (
            <>
              <Collapse ghost>
                <Panel header={moment(day).format('dddd, MMMM DD')} key={'1'}>
                  {/* todo 再做一个虚拟列表 */}
                  {
                    childrenList?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={item.id}
                            className={`${styles.contentBox} `}
                          >
                            <div>{item.title ?? '--'}</div>
                            <div>
                              {moment(item.hour).format('HH:mm a') ?? '--'} -
                              {moment(moment(item.hour).valueOf() + item.duration).format('HH:mm a') ?? '--'}
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                </Panel>
              </Collapse>
            </>
          ) : ""
        }
      </div>
    )
  }

  return (
    <>
      <Spin spinning={loading} size='large'>
        {
          showDaysList?.map((item, index) => {
            return <Section key={index} day={item} />
          })
        }
      </Spin>
    </>
  )
}

export default connect(({ metting, loading }: any) => ({
  ...metting,
  loading: !!loading.effects['metting/fetch'],
}))(MeetingNotes);