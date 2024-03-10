import DarkModeSwitcher from "./DarkModeSwitcher"
import DropdownUser from "./DropdownUser"

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header
      className="z-999 drop-shadow-1 dark:bg-boxdark sticky top-0 flex w-full bg-white dark:drop-shadow-none"
      style={{
        height: "70px",
      }}
    >
      <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation()
                props.setSidebarOpen(!props.sidebarOpen)
              }}
              className="z-99999 border-stroke dark:border-strokedark dark:bg-boxdark block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden"
            >
              <span className="h-5.5 w-5.5 relative block cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>

          {/* === FOR BREADCRUMB === */}
          <h1>Breadcrumb</h1>
        </div>

        <div className="2xsm:gap-7 flex items-center gap-3">
          <ul className="2xsm:gap-4 flex items-center gap-2">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  )
}

export default Header
