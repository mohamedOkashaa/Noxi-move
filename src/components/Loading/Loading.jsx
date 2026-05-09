// Loading.jsx
import style from './Loading.module.scss'

export default function Loading() {
  return (
    <div className={style.wrap}>
      <div className={style.bars}>
        {[...Array(7)].map((_, i) => (
          <div key={i} className={style.bar} style={{ animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
      <span className={style.txt}>loading</span>
    </div>
  )
}