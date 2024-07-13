
const CalendarLayout = ({ children } : { children: React.ReactNode }) => {

    return (
        <div>
            <main className="w-full h-screen">
                { children }
            </main>
        </div>
    )
}

export default CalendarLayout;