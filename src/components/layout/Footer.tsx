import { Link } from 'react-router-dom'
import { Zap, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

// Custom icon components
const GiteeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.593h6.815c.327 0 .593.265.593.593v3.408a4 4 0 0 1-4 4H8.222a4 4 0 0 1-4-4v-5.63a4 4 0 0 1 4-4h9.852z" fill="#C71D23"/>
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
            <a href="mailto:22230635@czu.cn" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </div>

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