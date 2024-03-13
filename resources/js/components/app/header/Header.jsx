import HeaderNav from "@/components/app/header/HeaderNav"
import HeaderAppSwitcher from "@/components/app/header/HeaderAppSwitcher"
import HeaderProfile from "@/components/app/header/HeaderProfile"
import HeaderSearch from "@/components/app/header/HeaderSearch"
import HeaderNotifications from "@/components/app/header/HeaderNotifications"

export default function DashboardHeader() {
  return (
    <div className="flex items-center h-24 px-4 border-b gap-x-2">
      <HeaderAppSwitcher />
      <HeaderNav className="mx-6" />
      <div className="flex items-center ml-auto space-x-4">
        {/*<HeaderSearch />*/}
        <HeaderProfile />
        <HeaderNotifications />
      </div>
    </div>
  )
}
