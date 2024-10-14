import { CVData } from '~/lib/schemas/classicCVTemplateSchema'

type CVDisplayProps = {
  data: CVData
}

export const CVDisplay: React.FC<CVDisplayProps> = ({ data }) => {
  return (
    <div className="cv-container space-y-8 p-4 border rounded-lg bg-white shadow-md">
      {/* Basic Information */}
      <section>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <h2 className="text-xl text-gray-700">{data.positionTitle}</h2>
        {data.portfolio && (
          <p className="text-sm text-blue-500">
            <a href={data.portfolio} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </p>
        )}
      </section>

      {/* Contact Information */}
      <section>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <ul className="list-disc ml-6">
          <li>Phone: {data.contact.phone}</li>
          <li>Email: {data.contact.email}</li>
          {data.contact.linkedin && <li>LinkedIn: {data.contact.linkedin}</li>}
        </ul>
      </section>

      {/* Summary */}
      <section>
        <h3 className="text-lg font-semibold">Summary</h3>
        <p>{data.summary}</p>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-semibold">Skills</h3>
        <ul className="list-disc ml-6">
          {data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Technologies */}
      <section>
        <h3 className="text-lg font-semibold">Technologies</h3>
        <ul className="list-disc ml-6">
          {data.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-lg font-semibold">Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={index} className="experience-item space-y-2">
            <h4 className="font-medium">
              {exp.position} at {exp.company}
            </h4>
            <p className="text-sm text-gray-500">{exp.duration}</p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h3 className="text-lg font-semibold">Education</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="education-item space-y-2">
            <h4 className="font-medium">
              {edu.degree} in {edu.fieldOfStudy}
            </h4>
            <p className="text-sm text-gray-500">{edu.institution}</p>
            <p className="text-sm">{edu.duration}</p>
          </div>
        ))}
      </section>

      {/* Certificates */}
      <section>
        <h3 className="text-lg font-semibold">Certificates</h3>
        {data.certificates.map((cert, index) => (
          <div key={index} className="certificate-item">
            <h4 className="font-medium">{cert.certTitle}</h4>
            <p className="text-sm text-gray-500">{cert.certDate}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CVDisplay
