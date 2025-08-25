import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import { Clock, BookOpen, Brain, Calculator, Music, Palette, Code, FlaskRound, Globe, History } from "lucide-react";

// Icon mapping for subjects
const subjectIcons: Record<string, React.ReactNode> = {
  math: <Calculator size={24} />,
  science: <FlaskRound size={24} />,
  art: <Palette size={24} />,
  music: <Music size={24} />,
  history: <History size={24} />,
  geography: <Globe size={24} />,
  programming: <Code size={24} />,
  literature: <BookOpen size={24} />,
  default: <Brain size={24} />,
};

interface Companion {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
}

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <article className={cn('custom-section', classNames)}>
      <h2 className="custom-section-title">{title}</h2>

      <div className="custom-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="custom-table-head">Lessons</TableHead>
              <TableHead className="custom-table-head">Subject</TableHead>
              <TableHead className="custom-table-head text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map(({ id, subject, name, topic, duration }) => (
              <TableRow key={id} className="custom-table-row">
                <TableCell className="custom-table-cell">
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-4">
                      <div className="custom-subject-icon" style={{ backgroundColor: getSubjectColor(subject) }}>
                        {subjectIcons[subject.toLowerCase()] || subjectIcons.default}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">
                          {name}
                        </p>
                        <p className="text-muted-foreground">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="custom-table-cell">
                  <div className="custom-badge custom-badge-outline max-md:hidden"
                    style={{
                      color: getSubjectColor(subject),
                      borderColor: getSubjectColor(subject)
                    }}>
                    {subject}
                  </div>
                  <div className="custom-subject-icon md:hidden"
                    style={{ backgroundColor: getSubjectColor(subject) }}>
                    {subjectIcons[subject.toLowerCase()] || subjectIcons.default}
                  </div>
                </TableCell>
                <TableCell className="custom-table-cell">
                  <div className="flex items-center gap-2 justify-end">
                    <Clock size={18} className="text-muted-foreground" />
                    <p className="text-lg font-medium">
                      {duration}
                      <span className="max-md:hidden ml-1">mins</span>
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  )
}

export default CompanionsList;