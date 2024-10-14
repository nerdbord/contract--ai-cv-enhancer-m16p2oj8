import { Experience } from './experience.js'
import { LeftSideSections } from './leftSideSections.js'
import { Section } from './section.js'
import { CvDataType } from './types.js'

const CV = (data: CvDataType) => {
  return (
    <div className="flex w-2/3 pt-12 border-stone-700 border-2 pb-16">
      {/* left side */}
      <div className="h-full w-2/5 flex flex-col px-8 justify-around">
        <h1 className="text-3xl font-bold pb-6">Karolina Parysz</h1>
        <LeftSideSections
          contact={data.contact}
          findMe={data.findMe}
          skills={data.skills}
          technologies={data.technologies}
          courses={data.courses}
          disclaimer={data.disclaimer}
        />
      </div>
      {/* right side */}
      <div className="h-full w-full flex flex-col justify-around px-8">
        <h2 className="pb-6 text-slate-600">CV - Nazwa stanowiska</h2>
        <Section
          name="o mnie"
          data={[
            'W tym miejscu mamy przestrzeń na około 3 zdania o Tobie. Kim jesteś, skąd pochodzisz, dokąd zmierzasz? Prosto,szczerze,personalnie. Dont overthink it.',
          ]}
        />
        <Experience experience={data.experience} />
        <Section name="education">
          {data.education.map((school) => {
            return (
              <>
                <p className="text-sm text-slate-600">{school.schoolName}</p>
                <p className="flex justify-between">
                  {school.studyName}
                  <span className="text-slate-600 text-sm">{school.year}</span>
                </p>
              </>
            )
          })}
        </Section>
      </div>
    </div>
  )
}

export { CV }
