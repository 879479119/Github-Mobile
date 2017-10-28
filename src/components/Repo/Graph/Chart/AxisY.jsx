import React from 'react'

export default function AxisY(p) {
  const {
    data, width, height, max: maxTop, reverse = false, auto = false, ...props
  } = p

  const arr = data.concat()
  const len = arr.length

  // get the max value of the commits
  let max = 0

  // these are all the line types
  const base = [1, 4, 8, 10, 16, 20, 40, 50, 80, 100, 160, 200, 300, 400, 500]
  let line = 500

  if (maxTop) {
    line = maxTop
    max = maxTop
  } else {
    for (let i = 0; i < len; i++) {
      if ((arr[i].c || arr[i]) > max) max = (arr[i].c || arr[i])
    }
    for (let t = base.length - 1; t > 0; t--) {
      if (max >= base[t]) {
        line = base[t]
        break
      }
    }
  }

  const per = height / max

  // if we need to show the lines as many as we would like to
  if (auto === true) {
    const tags = []
    const gap = [1, 2, 4, 5, 8, 10, 15, 20, 30, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4, 2e4, 5e4]
    gap.forEach((k) => {
      if (max / k >= 4 && max / k <= 6) {
        // tags.push()
        let t = (max / k) >>> 0
        while (t--) {
          tags.push(t * k)
        }
      }
    })

    return (
      <g {...props}>
        {
          tags.map((l) => {
            return (
              <g transform={`translate(0,${reverse ? l * per - 10 : height - l * per + 10})`} className="left">
                <text>{l}</text>
                <line x2={width} stroke="#ccc" strokeOpacity={0.5} shapeRendering="crispEdges" />
              </g>
            )
          })
        }
      </g>
    )
  } else {
    return (
      <g {...props}>
        <g transform={`translate(0,${reverse ? line * per - 10 : height - line * per + 10})`} className="left">
          <text>{line}</text>
          <line x2={width} stroke="#ccc" strokeOpacity={0.5} shapeRendering="crispEdges" />
        </g>
        <g transform={`translate(0,${reverse ? line / 2 * per - 10 : height - line / 2 * per + 10})`} className="left">
          <text>{line / 2}</text>
          <line x2={width} stroke="#ccc" strokeOpacity={0.5} shapeRendering="crispEdges" />
        </g>
      </g>
    )
  }
}
