import React, { useEffect } from 'react'
import { Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import i18n from 'src/i18n';
import { getLanguage } from 'utils/localStorage';
import flagLa from "images/Lao.svg.png";
import flagEn from "images/eng.png";
import flagVi from "images/Vietnam.svg.png";
import acceptInviteIcon from "images/profilepage-invite-accept.svg"
import { useUpdateSetting } from 'data/user';


function SettingMobile() {
  const { t } = useTranslation();
  const i18next = getLanguage();

  const [language, setLanguage] = React.useState('')
  const [bgMusic, setBgMusic] = React.useState(false)
  const {mutate} = useUpdateSetting(() => {})

  useEffect(() => {
    setLanguage(i18next);
  }, [i18next])

  const handleChangeMusic = e => {
    setBgMusic(e.target.checked)
    mutate({background_music: e.target.checked ? 1 : 0})
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    mutate({
      language: lng,
    })
  }

  return (
    <div style={{
      paddingBottom: "100px"
    }}>
      <Row className='profile-page-content__title mx-4 mt-3'>
        {t('profile.setting.sounds')}
      </Row>
      <Row className='profile-page-content__body setting m-3'>
        <Row className='content sound'>
          <p>{t('profile.setting.bg_music')}</p>
          <Form>
            <Form.Check
              defaultChecked={bgMusic}
              onChange={handleChangeMusic}
              type='switch'
            >
            </Form.Check>
          </Form>
        </Row>
      </Row>
      <Row className="profile-page-content__title mx-4">
				{t('profile.setting.lang')}
			</Row>
      <Row className='profile-page-content__body setting m-3'>
        <Row
					className="content"
					onClick={() => {
						changeLanguage('en')
						// setLocale('en')
						setLanguage('en')
					}}
				>
					<div style={{ width: '50%', display: 'inherit' }}>
						<img
							style={{ width: 24, height: 20, marginRight: 20 }}
							src={flagEn}
							alt="en"
						/>
						<p>{t('profile.setting.en')}</p>
					</div>

					{language === 'en' ? (
						<img src={acceptInviteIcon} alt="English" />
					) : null}
				</Row>

        <Row
					className="content"
					onClick={() => {
						changeLanguage('la')
						// setLocale('en')
						setLanguage('la')
					}}
				>
					<div style={{ width: '50%', display: 'inherit' }}>
						<img
							style={{ width: 24, height: 20, marginRight: 20 }}
							src={flagLa}
							alt="la"
						/>
						<p>{t('profile.setting.la')}</p>
					</div>

					{language === 'la' ? (
						<img src={acceptInviteIcon} alt="Laotian" />
					) : null}
				</Row>

        <Row
					className="content"
					onClick={() => {
						changeLanguage('vi')
						// setLocale('en')
						setLanguage('vi')
					}}
				>
					<div style={{ width: '50%', display: 'inherit' }}>
						<img
							style={{ width: 24, height: 20, marginRight: 20 }}
							src={flagVi}
							alt="vi"
						/>
						<p>{t('profile.setting.vi')}</p>
					</div>

					{language === 'vi' ? (
						<img src={acceptInviteIcon} alt="Vietnamese" />
					) : null}
				</Row>
      </Row>
    </div>
  )
}

export default SettingMobile