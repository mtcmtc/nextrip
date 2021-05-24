import { HiMoon, HiSun } from "react-icons/hi";
import styles from './toggle.module.css'

export default function Toggle({theme, toggleTheme}){
	return(
		<>
		<label className={`ml-5 ${styles.toggleWrapper}`} htmlFor="toggle">
		  <div className={`flex items-center dark:bg-gray-600 ${styles.toggle} ${theme === 'dark' ? styles.dark : styles.light}`}>
		    <span className={styles.hidden}>
		      {theme ? "Enable" : "Disable"}
		    </span>
		    <div className="icons flex justify-between items-center h-full my-0">
		      <HiSun className="z-0 w-5 h-5 mr-1 text-white"/>
			  <HiMoon className="z-0 w-5 h-5 ml-1 text-white"/>
		    </div>
		    <input
		      id="toggle"
		      name="toggle"
		      type="checkbox"
		      checked={theme}
		      onChange={toggleTheme}
		    />
		  </div>
		</label></>
	)
}