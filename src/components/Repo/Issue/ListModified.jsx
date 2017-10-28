import React from 'react'
import { Link } from 'react-router-dom'
import { Affix, Icon } from 'antd'
import cls from 'classnames'
import './ListModified.scss'
import brightness from '../../../utils/brightness'

export default function LabelList({
  list, className, base, ...props
}) {
  return (
    <Affix {...props} className={cls(className, 'label-list')} offsetTop={30}>
      <h3>Labels in the repo:</h3>
      <ul>
        {
          list.map(item => (
            <li>
              <Link
                to={`${base}?label=${item.name}`}
                className="item"
                style={{ background: `#${item.color}` || '#fff', color: brightness(item.color) > 0.5 ? '#222' : '#fff' }}
              >
                <Icon
                  type="tag-o"
                  style={{ verticalAlign: 'bottom', color: brightness(item.color) > 0.5 ? '#222' : '#fff' }}
                />{item.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </Affix>
  )
}
