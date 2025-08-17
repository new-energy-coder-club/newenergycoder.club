import { Link } from 'react-router-dom'
import { Zap, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

// Custom icon components
const GiteeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 4.2 2.73 7.77 6.52 9.03.48.09.65-.21.65-.46 0-.23-.01-.99-.01-1.81-2.4.44-3.02-.58-3.21-1.11-.11-.28-.57-1.11-.98-1.34-.33-.18-.81-.62-.01-.63.75-.01 1.29.69 1.47.98.86 1.45 2.24 1.04 2.79.79.09-.62.34-1.04.61-1.28-2.13-.24-4.36-1.07-4.36-4.74 0-1.05.37-1.91.98-2.58-.1-.24-.43-1.22.09-2.54 0 0 .8-.25 2.63.98.76-.21 1.58-.32 2.39-.32.81 0 1.63.11 2.39.32 1.83-1.24 2.63-.98 2.63-.98.52 1.32.19 2.3.09 2.54.61.67.98 1.52.98 2.58 0 3.68-2.24 4.5-4.37 4.74.35.3.65.87.65 1.76 0 1.27-.01 2.3-.01 2.61 0 .25.18.55.65.46A9.51 9.51 0 0021.5 12c0-5.25-4.25-9.5-9.5-9.5z" fill="#C71D23"/>
  </svg>
)

const WechatIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.932 7.621-.55-.302-2.676-2.476-4.81-5.722-6.04C10.138 2.462 9.420 2.188 8.691 2.188z" fill="#07C160"/>
    <path d="M23.999 14.6c0-3.573-3.248-6.425-7.249-6.425S9.5 11.027 9.5 14.6c0 3.564 3.249 6.426 7.25 6.426a8.863 8.863 0 0 0 2.5-.361c.21-.059.427-.027.617.086l1.332.78c.055.033.109.044.162.044.118 0 .214-.093.214-.207a.199.199 0 0 0-.035-.109l-.273-1.094a.436.436 0 0 1 .157-.492C22.819 18.918 23.999 16.82 23.999 14.6z" fill="#07C160"/>
    <circle cx="6.827" cy="9.53" r=".951" fill="white"/>
    <circle cx="10.559" cy="9.53" r=".951" fill="white"/>
    <circle cx="14.75" cy="14.6" r=".794" fill="white"/>
    <circle cx="18.999" cy="14.6" r=".794" fill="white"/>
  </svg>
)

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-secondary mt-auto pt-10 pb-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <a href="https://gitee.com/darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">
              {t.footer.clubName}
            </a>
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            {t.footer.description}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://gitee.com/darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <GiteeIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <WechatIcon className="h-5 w-5" />
            </a>
            <a href="mailto:contact@energycoderclub.org" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t.footer.navigation}</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.home}</Link></li>
            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.about}</Link></li>
            <li><Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.projects}</Link></li>
            <li><Link to="/events" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.events}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t.footer.resources}</h3>
          <ul className="space-y-2">
            <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">{t.footer.learningMaterials}</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.contact}</Link></li>
            <li><Link to="/join" className="text-sm text-muted-foreground hover:text-foreground">{t.footer.joinClub}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t.footer.contact}</h3>
          <div className="text-sm text-muted-foreground">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{t.footer.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" />
              <span>contact@energycoderclub.org</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-10 pt-6 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}