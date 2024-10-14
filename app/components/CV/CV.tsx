import { CVData } from '~/lib/schemas/classicCVTemplateSchema'
import { Experience } from './experience.js'
import { LeftSideSections } from './leftSideSections.js'
import { Section } from './section.js'

type CVDisplayProps = {
  data: CVData
}

export const CV: React.FC<CVDisplayProps> = ({ data }) => {
  return (
    <div className="flex w-2/3 pt-12 border-stone-700 border-2 pb-16">
      {/* left side */}
      <div className="h-full w-2/5 flex flex-col px-8 justify-around">
        <h1 className="text-3xl font-bold pb-6">{data.name}</h1>
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
        <h2 className="pb-6 text-slate-600">{data.positionTitle}</h2>
        <Section name="About me" data={[data.aboutMe]} />
        <Experience experience={data.experience} />
        {data.education && (
          <Section name="education">
            {data.education.map((school) => {
              return (
                <>
                  <p className="text-sm text-slate-600">{school?.schoolName}</p>
                  <p className="flex justify-between">
                    {school?.studyName}
                    <span className="text-slate-600 text-sm">
                      {school?.year}
                    </span>
                  </p>
                </>
              )
            })}
          </Section>
        )}
      </div>
    </div>
  )
}
