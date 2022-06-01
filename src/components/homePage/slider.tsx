import styles from 'styles/Home.module.css'
import Image from 'next/image'
import Img2 from 'assets/img/2.jpg'

const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src={Img2}
              height={1400}
              className={`d-block w-100 ${styles.ImgEffectSlider}`}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h4 className="h4 display-3">Primeiro Slide</h4>
              <p className="h6">Descrição Opicional.</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src={Img2}
              height={1400}
              className={`d-block w-100 ${styles.ImgEffectSlider}`}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h4 className="h4 display-3">Segundo Slide</h4>
              <p className="h6">Descrição Opicional.</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src={Img2}
              height={1400}
              className={`d-block w-100 ${styles.ImgEffectSlider}`}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h4 className="h4 display-3">Terceiro slide</h4>
              <p className="h6">Descrição Opicional</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

export default Slider
