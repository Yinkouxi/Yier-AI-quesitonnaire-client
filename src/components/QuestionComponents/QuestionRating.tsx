import React, { FC, useState } from 'react'
import styles from './QuestionRating.module.scss'

type PropsType = {
  fe_id: string
  props: {
    title: string
    maxScore: number
    required: boolean
    defaultValue: number
    icon: 'star' | 'heart'
  }
}

const QuestionRating: FC<PropsType> = ({ fe_id, props }) => {
  const {
    title,
    maxScore = 5,
    defaultValue = 0,
    required = false,
    icon = 'star',
  } = props

  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue)

  const getIcon = (isActive: boolean) => {
    if (icon === 'star') {
      return isActive ? '⭐' : '☆'
    }
    return isActive ? '💛' : '🤍'
  }

  return (
    <>
      <p>
        {title}
        {required && <span style={{ color: 'red' }}>*</span>}
      </p>
      <div className={styles.rateWrapper}>
        <input type='hidden' name={fe_id} value={selectedValue} />
        {Array.from({ length: maxScore }, (_, index) => {
          const value = index + 1
          const isActive =
            hoveredValue !== null
              ? value <= hoveredValue
              : value <= selectedValue

          return (
            <span
              key={value}
              className={styles.star}
              onMouseEnter={() => setHoveredValue(value)}
              onMouseLeave={() => setHoveredValue(null)}
              onClick={() => setSelectedValue(value)}
            >
              {getIcon(isActive)}
            </span>
          )
        })}
        <span className={styles.score}>
          {hoveredValue || selectedValue || 0}分
        </span>
      </div>
    </>
  )
}

export default QuestionRating
