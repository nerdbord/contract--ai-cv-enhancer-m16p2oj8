import { ExperienceType } from './types'

const Experience = ({ experience }: { experience: ExperienceType[] }) => {
  return (
    <div className="my-8">
      <h3 className="text-sm uppercase font-bold py-2">experience</h3>
      {experience.map((work, index) => {
        return (
          <div key={index} className="py-4">
            <p className="text-sm text-slate-600 ">
              <span className="italic">{work.companyName}</span>
            </p>
            <p className="text-xl font-bold w-full flex justify-between">
              {work.positionName}
              <span className="text-sm text-slate-600 font-normal">
                {work.date}
              </span>
            </p>
            <p className="text-sm">{work.description}</p>
          </div>
        )
      })}
    </div>
  )
}
export { Experience }
