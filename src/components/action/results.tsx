import { Timestamp } from "firebase/firestore";

export interface Result {
    name: string;
    attempts: number;
    createdAt: Timestamp;
}

interface ResultsProps {
    easyResults: Result[];
    mediumResults: Result[];
    hardResults: Result[];
}

const Results: React.FC<ResultsProps> = ({ easyResults, mediumResults, hardResults }) => {
    return (
        <div className="mt-8 flex justify-center sm:flex-row ">
            <div className="flex justify-center flex-col sm:flex-row sm:gap-8 ">
                <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 px-8 py-4 text-white mb-4">
                    <h2 className="text-center text-black">TOP 5 🚀</h2>
                    <h2 className="text-center text-indigo-500 font-bold">Easy</h2>
                    <ul>
                        {easyResults.sort((a, b) => {
                            if (!a.createdAt || !b.createdAt) {
                                return 0; // Pas de changement d'ordre si l'un des createdAt est undefined
                            }

                            if (a.attempts !== b.attempts) {
                                return a.attempts - b.attempts;
                            }

                            // Convertir _Timestamp en Date pour la comparaison
                            const aDate = a.createdAt.toDate();
                            const bDate = b.createdAt.toDate();

                            if (aDate.getTime() !== bDate.getTime()) {
                                return bDate.getTime() - aDate.getTime();
                            }

                            return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
                        }).slice(0, 5).map((result, index) => (
                            <li key={index}>
                                {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : '🍪 '}
                                {result.name} - {result.attempts}
                            </li>
                        ))}
                    </ul>








                </div>
                <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 px-8 py-4 text-white mb-4">
                    <h2 className="text-center text-black">TOP 5 🚀</h2>
                    <h2 className="text-center text-indigo-500 font-bold">Medium</h2>
                    <ul>
                        {mediumResults.sort((a, b) => {
                            if (!a.createdAt || !b.createdAt) {
                                return 0; // Pas de changement d'ordre si l'un des createdAt est undefined
                            }

                            if (a.attempts !== b.attempts) {
                                return a.attempts - b.attempts;
                            }

                            // Convertir _Timestamp en Date pour la comparaison
                            const aDate = a.createdAt.toDate();
                            const bDate = b.createdAt.toDate();

                            if (aDate.getTime() !== bDate.getTime()) {
                                return bDate.getTime() - aDate.getTime();
                            }

                            return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
                        }).slice(0, 5).map((result, index) => (
                            <li key={index}>
                                {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : '🍪 '}
                                {result.name} - {result.attempts}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 z-10 px-8 py-4 text-white mb-4">
                    <h2 className="text-center text-black">TOP 5 🚀</h2>
                    <h2 className="text-center text-indigo-500 font-bold">Hard</h2>
                    <ul>
                        {hardResults.sort((a, b) => {
                            if (!a.createdAt || !b.createdAt) {
                                return 0; // Pas de changement d'ordre si l'un des createdAt est undefined
                            }

                            if (a.attempts !== b.attempts) {
                                return a.attempts - b.attempts;
                            }

                            // Convertir _Timestamp en Date pour la comparaison
                            const aDate = a.createdAt.toDate();
                            const bDate = b.createdAt.toDate();

                            if (aDate.getTime() !== bDate.getTime()) {
                                return bDate.getTime() - aDate.getTime();
                            }

                            return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
                        }).slice(0, 5).map((result, index) => (
                            <li key={index}>
                                {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : '🍪 '}
                                {result.name} - {result.attempts}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Results;
