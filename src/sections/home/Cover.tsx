import { useState } from 'react'
import brand from '../../brand.config'

function SealFallback() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" stroke="#fff" strokeWidth="2"/>
      <circle cx="100" cy="100" r="65" stroke="#fff" strokeWidth="1"/>
      <polygon points="100,20 180,65 180,135 100,180 20,135 20,65" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <circle cx="100" cy="100" r="8" fill="#fff"/>
    </svg>
  )
}

export default function Cover() {
  const { nameLine1, nameLine2, title, version, date, preparedBy, coverSealImage } = brand.meta
  const [imgErr, setImgErr] = useState(false)
  return (
    <div className="cover">
      <h1 className="cover-heading">
        {nameLine1}{nameLine2 && <><br />{nameLine2}</>}
      </h1>
      <div className="cover-meta">
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div>{version}</div>
        <div>{date}</div>
        <div>Prepared by {preparedBy}</div>
      </div>
      <div className="cover-seal">
        {imgErr || !coverSealImage
          ? <SealFallback />
          : <img src={coverSealImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={() => setImgErr(true)} />
        }
      </div>
    </div>
  )
}
