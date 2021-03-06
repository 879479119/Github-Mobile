import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import './Filter.scss'

/**
 * the filter or sortable box
 * @param props
 * @return {XML}
 * @description
 * filter works only when the prop 'sort' is set to false, and it calls onFilter when clicked
 * sortable box works with a single selection just like radio, calling onSelect when clicked
 */

export default function Filter(props) {
  // additional arguments check
  const { type } = props
  return type === 'filter' ? filter(props) : sort(props)
}

Filter.prototype.propTypes = {
  type: PropTypes.string.isRequired,
}

function sort(props) {
  const {
    prefix, data, sort: isSort, style, type, defaultSelected, onSelect, onSort,
  } = props
  let prev = defaultSelected

  function onList(e) {
    e.target.parentNode.childNodes[prev + 1].classList.remove('active')
    e.target.classList.add('active')
    const i = +e.target.getAttribute('data-c')
    prev = i
    onSelect(i)
  }

  function onOrder(order) {
    return function () {
      onSort(order)
    }
  }

  return (
    <div className={`${prefix || ''}filter`} style={style}>
      <ul>
        <li className="title">{type || 'Sortable'}</li>
        {
          data.map((item, index) => {
            let active = false
            if (index === defaultSelected) active = true
            return <li className={cls('item', { active })} onClick={onList} data-c={index}>{item}</li>
          })
        }
        {
          isSort ? [<li className="title" key="s">Sort</li>, <li key="asc" className="active" onClick={onOrder(1)}>Asc</li>, <li key="desc" onClick={onOrder(-1)}>Desc</li>] : ''
        }
      </ul>
    </div>
  )
}

function filter(props) {
  const {
    prefix, data, style, defaultSelected, onFilter,
  } = props
  const selection = new Set()
  selection.add(defaultSelected)

  function onClick(e) {
    e.target.classList.toggle('active')
    const i = +e.target.getAttribute('data-c')
    selection.has(i) ? selection.delete(i) : selection.add(i) // eslint-disable-line
    onFilter(Array.from(selection))
  }

  return (
    <div className={`${prefix || ''}filter`} style={style}>
      <ul>
        <li className="title">Filter</li>
        {
          data.map((item, index) => {
            let active = false
            // single number
            if (index === defaultSelected) active = true
            else {
              // array
              try {
                if (Array.isArray(defaultSelected) && defaultSelected.indexOf(index)) active = true
              } catch (e) { console.log(e) }
            }
            return <li className={cls('item', { active })} onClick={onClick} data-c={index}>{item}</li>
            })
          }
      </ul>
    </div>
  )
}
