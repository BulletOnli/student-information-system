import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const todoItems: TodoItem[] = [
  {
    id: "1",
    title: "Complete Math Assignment",
    completed: false,
    dueDate: "Tomorrow",
  },
  {
    id: "2",
    title: "Read Chapter 5",
    completed: false,
    dueDate: "Friday",
  },
  {
    id: "3",
    title: "Submit Project Proposal",
    completed: true,
    dueDate: "Done",
  },
];

export function TodoList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>To Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todoItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox id={item.id} checked={item.completed} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={item.id}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    item.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.title}
                </label>
                <p className="text-sm text-muted-foreground">
                  Due: {item.dueDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
