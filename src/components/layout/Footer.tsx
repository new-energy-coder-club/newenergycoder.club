import { Link } from 'react-router-dom'
import { Zap, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import bonjourIcon from '../../bonjour.ico'
import wechatImg from '../../assets/wechat.png'

// Custom icon components
const GiteeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.593h6.815c.327 0 .593.265.593.593v3.408a4 4 0 0 1-4 4H8.222a4 4 0 0 1-4-4v-5.63a4 4 0 0 1 4-4h9.852z" fill="#C71D23"/>
  </svg>
)

// Deprecated inline SVG replaced by image asset usage

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-secondary mt-auto pt-10 pb-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <a href="https://gitee.com/darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">
              <span className="text-primary">{'{'}
              </span>
              {t.footer.clubName}
              <span className="text-primary">{'}'}
              </span>
            </a>
          </div>
          <div className="mt-2">
            <a href="https://gitee.com/explore/robot?order=starred&page=2" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gitee No.24 机器人开源仓库
            </a>
          </div>
          <p className="text-primary font-bold text-sm mt-2">
            {t.footer.description}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://gitee.com/darrenpig/new_energy_coder_club" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <GiteeIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <img src={wechatImg} alt="WeChat" className="h-5 w-auto object-contain" />
            </a>
            <a href="mailto:22230635@czu.cn" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <a href="https://bonjour.bio/darrenpig" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground mt-2 inline-flex items-center gap-2">
            <img src={bonjourIcon} alt="Bonjour" className="h-5 w-5" />
            <span>Bonjour</span>
          </a>

        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t.footer.navigation}</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.home}</Link></li>
            <li><Link to="/team" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.team}</Link></li>
            <li><Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.projects}</Link></li>
            <li><Link to="/events" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.events}</Link></li>
            <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.resources}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t.footer.resources}</h3>
          <ul className="space-y-2">
            <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">{t.footer.learningMaterials}</Link></li>
            <li><Link to="/innovation" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.innovation}</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t.nav.contact}</Link></li>
            <li><Link to="/join" className="text-sm text-muted-foreground hover:text-foreground">{t.footer.joinClub}</Link></li>
            <li><Link to="/getting-started" className="text-sm text-muted-foreground hover:text-foreground">{t.footer.gettingStarted}</Link></li>
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
              <span>22230635@czu.cn</span>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <span>Tel: +86 158 96000818</span>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <img src={wechatImg} alt="WeChat" className="h-4 w-auto object-contain mt-0.5 shrink-0" />
              <span>Wechat:</span>
              <span className="ml-1">Pei-pei-Zhu-Pig</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-10 pt-6 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 New Energy Coder Club. All rights reserved.</p>
          <p>苏ICP备2025187096号-1X</p>
        </div>
      </div>
    </footer>
  )
}