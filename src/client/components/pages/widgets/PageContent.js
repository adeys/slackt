import {h} from 'preact';

export default () => {
    return (
        <div className="content">
            <main>
                <div className="container-fluid">
                    <h1 className="mt-4">Dashboard</h1>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Slackt 2020</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};