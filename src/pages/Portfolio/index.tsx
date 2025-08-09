import { cn } from '../../shared/utils/cn';

function Portfolio() {
  return (
    <div className={cn("flex p-5 gap-5 fade-in")}>
      <div className={cn("flex-1 pr-5")}>
        <h1>About Me</h1>
        <p>Hello! I am a passionate software engineer with a focus on web development and cloud technologies. I enjoy building scalable and efficient applications.</p>
      </div>
      <div className={cn("flex-[3] px-5")}>
        <section id="project1" className={cn("mb-10 pb-5 border-b border-gray-200")}>
          <h2 className={cn("text-gray-800 mb-2.5")}>Project 1: My Awesome Web App (2023)</h2>
          <div className={cn("flex gap-2.5 mb-4")}>
            <img src="https://via.placeholder.com/300x200?text=Project+1+Image+1" alt="Project 1 Image 1" className={cn("max-w-full h-auto rounded-lg shadow-md")} />
            <img src="https://via.placeholder.com/300x200?text=Project+1+Image+2" alt="Project 1 Image 2" className={cn("max-w-full h-auto rounded-lg shadow-md")} />
          </div>
          <p className={cn("mb-4 leading-relaxed")}>This was a full-stack web application designed to help users manage their daily tasks efficiently. It featured user authentication, task creation, and progress tracking.</p>
          <table className={cn("w-full border-collapse mt-4")}>
            <thead>
              <tr>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Main Development Details</th>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Technology Stack</th>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Open Source Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>
                  <ul className={cn("list-disc ml-5 p-0")}>
                    <li>Implemented RESTful APIs</li>
                    <li>Developed responsive UI</li>
                    <li>Integrated with external services</li>
                  </ul>
                </td>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>React, Node.js, Express, MongoDB</td>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>None</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="project2" className={cn("mb-10 pb-5 border-b border-gray-200")}>
          <h2 className={cn("text-gray-800 mb-2.5")}>Project 2: Cloud Automation Tool (2022)</h2>
          <div className={cn("flex gap-2.5 mb-4")}>
            <img src="https://via.placeholder.com/300x200?text=Project+2+Image+1" alt="Project 2 Image 1" className={cn("max-w-full h-auto rounded-lg shadow-md")} />
            <img src="https://via.placeholder.com/300x200?text=Project+2+Image+2" alt="Project 2 Image 2" className={cn("max-w-full h-auto rounded-lg shadow-md")} />
          </div>
          <p className={cn("mb-4 leading-relaxed")}>A tool built to automate cloud resource provisioning and management, reducing manual effort and ensuring consistent deployments.</p>
          <table className={cn("w-full border-collapse mt-4")}>
            <thead>
              <tr>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Main Development Details</th>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Technology Stack</th>
                <th className={cn("border border-gray-300 p-2.5 text-left bg-gray-100 font-bold")}>Open Source Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>
                  <ul className={cn("list-disc ml-5 p-0")}>
                    <li>Automated infrastructure deployment</li>
                    <li>Developed custom scripts</li>
                    <li>Integrated with cloud APIs</li>
                  </ul>
                </td>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>Python, AWS SDK, Terraform</td>
                <td className={cn("border border-gray-300 p-2.5 text-left")}>Terraform</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className={cn("flex-1 pl-5 border-l border-gray-200")}>
        <h2>Table of Contents</h2>
        <ul className={cn("list-none p-0")}>
          <li><a href="#project1" className={cn("no-underline text-blue-600 block py-1.5 hover:underline hover:text-blue-700")}>My Awesome Web App</a></li>
          <li><a href="#project2" className={cn("no-underline text-blue-600 block py-1.5 hover:underline hover:text-blue-700")}>Cloud Automation Tool</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;