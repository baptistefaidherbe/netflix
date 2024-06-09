import styles from './modal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useIsVideoAccessible from '@/hooks/useIsVideoAccessible';

const Modal = ({
  show,
  onClose,
  itemFilter,
  addToCart,
  session,
}: {
  show: boolean;
  onClose: () => void;
  addToCart: (item: any) => void;
  session: string;
  itemFilter: CartItem;
}) => {
  const isVideoAccessible = useIsVideoAccessible(session, itemFilter);

  return (
    <>
      {show && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <div className={styles.modalContent}>
              <div className={styles.modalContent_bg}>
                <div className={styles.modalContent_bg_img}>
                  <Image
                    src={itemFilter.Images[0]}
                    alt='avatar.png'
                    style={{ objectFit: 'cover' }}
                    fill
                  />
                </div>
                <div className={styles.modalContent_bg_wrapper}>
                  <h2>{itemFilter.Title}</h2>
                  <div className={styles.modalContent_bg_wrapper_button}>
                    {isVideoAccessible ? (
                      <Link
                        href={{
                          pathname: `/watch/${itemFilter.Id}`,
                          query: { isVideoAccessible },
                        }}
                      >
                        <button
                          className={styles.modalContent_bg_wrapper_button_play}
                        >
                          Lecture
                        </button>
                      </Link>
                    ) : (
                      <button
                        className={styles.modalContent_bg_wrapper_button_play}
                        onClick={() => addToCart(itemFilter)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          role='img'
                          data-icon='PlayStandard'
                          aria-hidden='true'
                        >
                          <path
                            d='M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z'
                            fill='currentColor'
                          ></path>
                        </svg>
                        Ajouter au panier
                      </button>
                    )}
                    <button
                      className={styles.modalContent_bg_wrapper_button_add}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        role='img'
                        data-icon='PlusStandard'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </button>
                    <button
                      className={styles.modalContent_bg_wrapper_button_like}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        role='img'
                        data-icon='ThumbsUpStandard'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.modalContent_info}>
                <div className={styles.modalContent_info_colLeft}>
                  <span>{itemFilter.Year}</span>
                  <span>{itemFilter.Runtime}</span>
                  <p>{itemFilter.Plot}</p>
                </div>
                <div className={styles.modalContent_info_colRight}>
                  <div>
                    <span>Distribution</span>
                    <p>{itemFilter.Actors}</p>
                  </div>
                  <div>
                    <span>Genre</span>
                    <p>{itemFilter.Genre}</p>
                  </div>
                  <div>
                    <span>Prix</span>
                    <p>{`${itemFilter.Price} €`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
