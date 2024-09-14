import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Page2() {
  return (
    <div className="h-screen w-screen overflow-auto bg-gradient-to-br from-blue-100 to-purple-100 m-0 p-0">
      <div className="w-full h-full">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">GeomPT</h1>
        <h1 className="text-2xl font-bold text-black">progress</h1>
      </header>
      <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
        <CardContent className="h-full overflow-auto">
          <div className="mb-4">
          <h2 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-8 leading-tight">Prescribe:</h2>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <Card key={index} className="w-50">
                  <CardContent className="p-2 h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                      Video {index}
                    </div>
                    <Progress value={33} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}