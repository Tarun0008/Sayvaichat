import './App.css';

function App() {
  return (
    <div className="App">
      <div className="site-section" id="programs-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
              <h2 className="section-title">This Project</h2>
              <p>
              This network scanning project, developed using Python and Scapy, enables users to explore devices connected within a specified IP range of a network. By employing ARP requests, the script discovers active devices, retrieves their IP and MAC addresses, and attempts to acquire device names through reverse DNS lookup. It offers a concise overview of the network's active devices, aiding administrators in network management and security assessments. The tool's functionalities encompass defining IP ranges, sending ARP requests, analyzing responses, identifying devices, and presenting crucial details like IP addresses, MAC addresses, and potentially device names or manufacturer information, offering insights into the network's connected infrastructure.

              </p>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
