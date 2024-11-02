export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1>Welcome to Rafton</h1>

      <div className="flex items-center justify-center mt-20 w-24 h-24 bg-white rounded-full animate-slow-spin">
        <div className="flex items-center justify-center w-12 h-11 bg-rafton-blue rounded-full">
          <div className="flex items-center justify-center w-11 h-11 bg-white rounded-full">
            <div className="flex items-center justify-center w-8 h-7 bg-rafton-blue rounded-full">
              <div className="flex items-center justify-center w-7 h-7 bg-white rounded-full">
                <div className="flex items-center justify-center w-5 h-4 bg-rafton-blue rounded-full">
                  <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
