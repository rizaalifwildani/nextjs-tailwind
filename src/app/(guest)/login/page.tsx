import CoreCard from "@/components/core/CoreCard"
import CoreButton from "@/components/core/button/CoreButton"
import CoreInput from "@/components/core/input/CoreInput"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  return (
    <section className="login-page">
      <div className="flex h-screen items-center justify-center">
        <div className="w-90 md:w-2/3 lg:w-1/3 xl:w-1/3">
          <CoreCard padding={30}>
            <>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to TailAdmin
              </h2>

              <form>
                <div className="mb-4">
                  <CoreInput
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    appendIcon={<EnvelopeIcon className="h-5 w-5" />}
                  />
                </div>

                <div className="mb-6">
                  <CoreInput
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    appendIcon={<LockClosedIcon className="h-5 w-5" />}
                  />
                </div>

                <div className="mb-5">
                  <CoreButton
                    type="submit"
                    label="Sign In"
                    className="h-10 w-full text-lg"
                  />
                </div>
              </form>
            </>
          </CoreCard>
        </div>
      </div>
    </section>
  )
}
