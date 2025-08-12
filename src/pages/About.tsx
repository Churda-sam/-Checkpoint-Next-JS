import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const skills = [
    "React", "TypeScript", "JavaScript", "Node.js", "Python", 
    "HTML/CSS", "Tailwind CSS", "Git", "MongoDB", "PostgreSQL"
  ];

  const experience = [
    {
      company: "Tech Solutions Inc.",
      role: "Frontend Developer",
      period: "2022 - Present",
      description: "Developing responsive web applications using React and TypeScript."
    },
    {
      company: "Digital Agency",
      role: "Web Developer Intern",
      period: "2021 - 2022",
      description: "Built landing pages and maintained client websites."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Passionate developer creating innovative digital solutions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>My Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with a love for creating elegant, 
                user-friendly applications. With experience in modern web technologies, 
                I enjoy turning complex problems into simple, beautiful designs.
              </p>
              <br />
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open source projects, or enjoying outdoor activities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>My professional journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-lg">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;